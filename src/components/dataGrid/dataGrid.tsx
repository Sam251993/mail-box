import React from "react";

const data = [
    { id: 1, name: "Clayton Jefferson", age: 25 },
    { id: 2, name: "Mabel Bates", age: 36 },
    { id: 3, name: "Mildred Davis", age: 19 }
];

const columns = [
    { header: "ID", field: "id" },
    { header: "Name", field: "name" },
    { header: "Age", field: "age" },
    { header: 'Date Created', field: 'dateCreated' },
    { header: 'Last Login', field: 'lastLogin' }, 
];

const Grid = () => {
    return (
        <div>
            <div>
                <div className="grid-cols-5 grid w-6/12">
                    {columns.map((column) => (
                        <div className=" justify-center flex" key={column.field}>{column.header}</div>
                    ))}
                </div>
                <div>
                    {data.map((row) => (
                        <div key={row.id} className="grid-cols-5 grid w-6/12">
                            <div className=" justify-center flex">{row.id}</div>
                            <div className=" justify-center flex">{row.name}</div>
                            <div className=" justify-center flex">{row.age}</div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
