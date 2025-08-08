'use client';

import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import { addMinutes } from 'date-fns';

type AppDateTimePickerProps = {
    /** 선택 값 */
    value: Date | null;
    /** 값 변경 핸들러 */
    onChange: (value: Date | null) => void;
    /** MUI 포맷 문자열 (기본: yyyy-MM-dd HH:mm) */
    format?: string;
} & Omit<
    DateTimePickerProps,
    'value' | 'onChange' | 'format'
>;

function ceilToStep(date: Date, step: number) {
    const d = new Date(date);
    d.setSeconds(0, 0);
    const m = d.getMinutes();
    const next = Math.ceil(m / step) * step;
    if (next === m) return addMinutes(d, step);
    d.setMinutes(next);
    return d;
}

export default function AppDateTimePicker({
    value,
    onChange,
    minutesStep = 5,
    format = 'yyyy-MM-dd HH:mm',
}: AppDateTimePickerProps) {
    const step = Number(minutesStep)
    const computedMin = ceilToStep(new Date(), step)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            <DateTimePicker
                value={value}
                onChange={onChange}
                format={format}
                minutesStep={minutesStep}
                minDateTime={computedMin}
                sx={{
                    /* 달력 오늘/선택 색 */
                    '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: '#0BAFDC !important',
                        color: '#fff',
                    },
                    '& .MuiPickersDay-root.MuiPickersDay-today': {
                        borderColor: '#0BAFDC',
                    },

                    /* 👉 시간 선택 컬럼(시/분) 선택 색 */
                    '& .MuiMultiSectionDigitalClockSection-item.Mui-selected': {
                        backgroundColor: '#0BAFDC',
                        color: '#fff',
                    },
                    '& .MuiMultiSectionDigitalClockSection-item.Mui-selected:hover': {
                        backgroundColor: '#0BAFDC',
                    },

                    /* 액션 바 버튼 색 */
                    '& .MuiDialogActions-root .MuiButton-root': {
                        color: '#0BAFDC',
                        fontWeight: 700,
                    },
                }}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        placeholder: '작업 기한을 선택해주세요',
                        size: 'small',
                        sx: {
                            borderRadius: '6px',
                            backgroundColor: '#F4F4F5',
                            fontSize: '16px',
                            '& input': { padding: '10px 16px' },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        },
                    },
                    day: {
                        sx: {
                            '&.Mui-selected': {
                                backgroundColor: '#0BAFDC', // primary-600
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#099dc7',
                                },
                            },
                            '&.MuiPickersDay-today': {
                                borderColor: '#0BAFDC',
                            },
                        },
                    },
                    actionBar: {
                        actions: ['cancel', 'accept'],
                        sx: {
                            '& .MuiButton-root': {
                                color: '#0BAFDC',
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: 'rgba(11, 175, 220, 0.1)',
                                },
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}