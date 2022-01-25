import React from 'react';
import { FiEdit, FiDelete } from 'react-icons/fi'

function List({ id, name, delGrocery, handleEdit }) {

    return <article className="grocery">
        <div className="names">
            <h4>
                {name}
            </h4>
        </div>
        <div>
            <FiEdit className="edit" onClick={() => handleEdit(id)} />
            <FiDelete className="delete" onClick={() => delGrocery(id)} />
        </div>
    </article>;
}

export default List;
