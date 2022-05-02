import React, { useContext, useState } from 'react'
import { Api } from '../../Context/Api'
import Input from '../input/Input'
import './table.css'

const Table = () => {

    const { setArray, json, filterAr } = useContext(Api)
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState('')
    const [inputs, setInputs] = useState({});

    const handleChange = ({ target }) => {
        const name = target.name
        const value = target.value
        return setInputs(values => ({ ...values, [name]: value }))
    }

    const remove = (index) => {
        if (index > -1) {
            let ar = JSON.parse(localStorage.getItem('array'))
            ar.splice(index, 1)
            setArray(ar)
        }
    }

    const edit = (index) => {

        setOpen(!open)
        setIndex(index)
    }

    const editArray = () => {

        json[index].titulo = inputs.titulo
        json[index].tipo = inputs.tipo
        json[index].categoria = inputs.categoria
        json[index].valor = inputs.valor
        setOpen(!open)
        localStorage.setItem('array', JSON.stringify(json))
        setArray(json)

    }

    return (
        <div className='container'>

            {open &&
                <div className='modal'>
                    <span className='close' onClick={() => setOpen(false)}>X</span>
                    <h1>Editar</h1>
                    <Input label='Título' value={inputs.titulo} name='titulo' type='text' onChange={handleChange} required={true} />
                    <Input label='Tipo' value={inputs.tipo} name='tipo' type='text' onChange={handleChange} required={true} />
                    <Input label='Categoria' value={inputs.categoria} name='categoria' type='text' onChange={handleChange} required={true} />
                    <Input label='Valor' value={inputs.valor} step=".01" min='0' name='valor' type='number' onChange={handleChange} required={true} />
                    <button className='btn btn-add' onClick={editArray}>Editar</button>
                </div>
            }
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>TÍTULO</th>
                            <th>TIPO</th>
                            <th>CATEGORIA</th>
                            <th>VALOR</th>
                            <th>DATA DA TRANSAÇÃO</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterAr.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.titulo}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.categoria}</td>
                                    <td>R$ {item.valor}</td>
                                    <td>{item.data}</td>
                                    <td onClick={() => edit(index)} className='edit'>E</td>
                                    <td onClick={() => remove(index)} className='erase'>X</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table