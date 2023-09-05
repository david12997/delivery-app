'use client'

import React, {useState} from "react";
import {
    Calendar as BigCalendar,
    Event,
    momentLocalizer,
    SlotInfo,
    Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
  
moment.locale("es-CO");

const localizer = momentLocalizer(moment);

const events:Event[] = [];


const customTimeslots: number = 1; // Número de casillas por hora que quieres mostrar

const getDateCellWrapperStyle = (date: Date) => {
    const day = date.getDay();
    const isSunday = day === 0;
    
    if (isSunday) {
        return {
            pointerEvents: 'none', // Deshabilita la interacción con el día de domingo
            backgroundColor: '#f2f2f2' // Cambia el color de fondo de los días de domingo
        };
    }
    
    return {};
};


export default function CustomCalendar(): JSX.Element {
    const [view, setView] = useState(Views.WEEK);
    const [userEvents, setUserEvents] = useState<any[]>([]);
    const [busySlots, setBusySlots] = useState<Date[]>([]);



    const [dateRange, setDateRange] = useState<{ min: Date; max: Date }>({
        min: new Date(0, 0, 0, 7, 0, 0),
        max: new Date(0, 0, 0, 21, 0, 0)
    });

    const onNavigate = (newDate: Date) => {
        const day = newDate.getDay();

        if (day >= 1 && day <= 5) {
            setView(Views.WEEK);
            setDateRange({
                min: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 6, 0, 0),
                max: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 22, 0, 0)
            });
        } 
    };

    const onSelectSlot = (slotInfo: SlotInfo) => {
        const selectedDate = slotInfo.start;
        const day = selectedDate.getDay();
    
        if (day >= 1 && day <= 5) {
            // Verifica si la casilla seleccionada está ocupada
            const isSlotAvailable = !busySlots.some(date => 
                moment(selectedDate).isBetween(date, moment(date).add(1, 'hour'))
            );
    
            if (isSlotAvailable) {
                const newEvent = {
                    id: userEvents.length + 1,
                    title: "Nuevo evento",
                    start: selectedDate,
                    end: moment(selectedDate).add(1, 'hour').toDate(),
                    resourceId: 1
                };
    
                const eventTitle = prompt("Ingresa el título del evento:");
                if (eventTitle) {
                    newEvent.title = eventTitle;
                    setUserEvents([...userEvents, newEvent]);
                    setBusySlots([...busySlots, selectedDate]);
                    console.log("Evento creado en día hábil:", newEvent);
                }
            } else {
                alert("La casilla seleccionada ya está ocupada:");
            }
        } else {
            alert("Casilla seleccionada en fin de semana:");
        }
    };

    return <>
        <h1 className="w-[100%] text-[18px] font-bold text-black flex items-center justify-center">
            Agenda tu ruta
        </h1>
        <br />
        <BigCalendar
            step={60}
            selectable
            localizer={localizer}
            events={[...events, ...userEvents]}
            view={view}
            onView={() => setView("week")}
            onNavigate={onNavigate}
            date={new Date()}
            min={dateRange.min}
            max={dateRange.max}
            views={[Views.WEEK]}
            timeslots={customTimeslots}
            onSelectSlot={onSelectSlot}
            onSelectEvent={(event) => console.log(event)}
            
        />
        
        
    </>;
}