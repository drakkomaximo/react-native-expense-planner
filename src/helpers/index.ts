/* eslint-disable prettier/prettier */

export const formatAmount = ({amount}: {amount: number}) => {
  return Number(amount).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
};

export type Settings = {
  year: 'numeric' | '2-digit' | undefined;
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: 'numeric' | '2-digit' | undefined;
};

export const formatDate = ({date}: {date: number}) => {
  const newDate = new Date(date);
  const settings: Settings = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return newDate.toLocaleDateString('en-US', settings);
};

export const generateId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);
  return random + date;
};
