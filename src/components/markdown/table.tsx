import React from 'react';

const CustomTable = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">{children}</table>
        </div>
    );
};
const CustomTableRow = ({ children }: { children: React.ReactNode }) => {
    return <tr className="border-border">{children}</tr>;
};


export { CustomTable, CustomTableRow };
