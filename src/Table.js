import numeral from 'numeral'
import React from 'react'
import "./Table.css";

const Table = ({ countries }) => {
    return (
        <div className="table">
            {countries.map((country) => (
                <tr key={country.country}>
                    <td>{country.country}</td>
                    <td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                </tr>
          ))}
        </div>
    );
}

export default Table
