import React from 'react';
import { Shift } from '../types/shift';

interface TimelineProps {
    shifts: Shift[] | null;
}

const Timeline: React.FC<TimelineProps> = ({ shifts }) => {
    const renderTimeline = () => {
        const timeline = [];
        const startHour = 8;
        const endHour = 20;
        const totalMinutes = (endHour - startHour) * 60;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentOffset = (((currentHour - startHour) * 60 + currentMinutes) / totalMinutes) * 100;

        for (let minute = 0; minute <= totalMinutes; minute += 10) {
            const hour = Math.floor(minute / 60) + startHour;
            const min = minute % 60;
            const timeLabel = min === 0 ? `${hour}:00` : '';

            timeline.push(
                <div key={minute} className='relative flex items-center h-2'>
                    <div className='w-12 text-right pr-2'>{timeLabel}</div>
                    <div className='flex-1 h-1 bg-gray-200 relative'>
                        {min === 0 && (
                            <div className='absolute inset-y-0 left-0 w-full border-t border-gray-400'></div>
                        )}
                        {shifts?.map((shift, index) => {
                            const shiftStartHour = parseInt(shift.start_time.split(':')[0], 10);
                            const shiftEndHour = parseInt(shift.end_time.split(':')[0], 10);
                            const shiftStartMinutes = parseInt(shift.start_time.split(':')[1], 10);
                            const shiftEndMinutes = parseInt(shift.end_time.split(':')[1], 10);

                            const startOffset = ((shiftStartHour - startHour) * 60 + shiftStartMinutes) / totalMinutes * 100;
                            const endOffset = ((shiftEndHour - startHour) * 60 + shiftEndMinutes) / totalMinutes * 100;

                            if (minute >= (shiftStartHour - startHour) * 60 + shiftStartMinutes && minute < (shiftEndHour - startHour) * 60 + shiftEndMinutes) {
                                return (
                                    <div
                                        key={index}
                                        className='absolute left-1/4 w-1/2'
                                        style={{
                                            top: `${startOffset}%`,
                                            height: `${endOffset - startOffset}%`,
                                            backgroundColor: 'green',
                                        }}
                                    ></div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            );
        }

        timeline.push(
            <div
                key="current-time"
                className="absolute left-0 w-full border-t-2 border-red-500"
                style={{ top: `${currentOffset}%` }}
            ></div>
        );

        return timeline;
    };

    return <>{renderTimeline()}</>;
};

export default Timeline;
