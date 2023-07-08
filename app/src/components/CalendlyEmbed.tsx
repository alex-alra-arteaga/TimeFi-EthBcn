import React from 'react';
import { InlineWidget } from 'react-calendly';

const CalendlyEmbed: React.FC = () => {
  return (
    <div>
      <InlineWidget url="https://calendly.com/testingalex" />
    </div>
  );
};

export default CalendlyEmbed;