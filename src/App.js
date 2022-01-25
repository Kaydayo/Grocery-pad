import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';

function App() {
  const [name, setName] = useState('')
  const [modal, setModal] = useState({ show: false, msg: '', type: '' })
  const [list, setList] = useState([])
  const [isEdit, setEdit] = useState(false)
  const [showClear, setShowClear] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setModal({ ...modal, show: true, msg: 'please input a value', type: 'red' })
      return
    }
    const id = new Date().getTime().toString()
    const newName = { id, name }
    setList([...list, newName])
    setModal({ ...modal, show: true, msg: 'one grocery added', type: 'green' })
    setName('')
  }
  const delGrocery = (id) => {
    setList(list => list.filter(elem => elem.id !== id))
    setModal({ ...modal, show: true, msg: 'one item deleted', type: 'red' })
  }
  const handleEdit = (id) => {
    if (name) {
      setModal({ ...modal, show: true, msg: 'click edit to save editing', type: 'red' })
    } else {
      setEdit(true)
      const grocery = list.find(elem => elem.id === id)
      setList(list => list.filter(elem => elem.id !== id))
      setName(grocery.name)
      setModal({ ...modal, show: true, msg: 'one to be edited', type: 'red' })
    }

  }

  const submitEdit = (e) => {
    e.preventDefault()
    if (!name) {
      setModal({ ...modal, show: true, msg: 'please input a value', type: 'red' })
      return
    }
    const id = new Date().getTime().toString()
    const newName = { id, name }
    setList([...list, newName])
    setModal({ ...modal, show: true, msg: 'edited one grocery', type: 'green' })
    setName('')
    setEdit(false)
  }
  const closeModal = (e) => {
    e.preventDefault()
    setModal({ show: false, msg: '', type: '' })

  }

  const clearAll = () => {
    setList([])
    setModal({ ...modal, show: true, msg: 'all grocery deleted', type: 'red' })
    setShowClear(false)
  }
  useEffect(() => {
    if (list.length > 0) {
      setShowClear(true)
    }
  }, [list.length]);

  useEffect(() => {
    const timeout = setTimeout(() =>
      setModal({ show: false, msg: '', type: '' })
      , 1000)
    return () => clearTimeout(timeout)
  }, [modal])


  console.log(list)
  return (
    <>
      <section className="header">
        {modal.show && <p className={modal.type}>{modal.msg}<span onClick={closeModal}>&times;</span></p>}
        <div className="box-form">
          <form>
            <label htmlFor="names">Enter grocery name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {!isEdit ? <button type="submit" onClick={handleSubmit}>Submit</button> : <button type="submit" onClick={submitEdit}>Edit</button>}
          </form>
        </div>

      </section>
      <div className="allContent">
        {list.map(item => <List key={item.id} {...item} delGrocery={delGrocery} handleEdit={handleEdit} />)}
      </div>
      {showClear && <h5 className='clear' onClick={clearAll}>clear items</h5>}
    </>
  );
}

export default App;
