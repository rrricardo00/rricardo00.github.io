import React, { useState, useContext, useEffect, useReducer } from 'react'
import { Api } from '../../Context/Api'
import Input from '../input/Input'


import './create.css'

const Create = () => {

    const { array, setArray, filterAr, setFilter } = useContext(Api)

    const [turn, setTurn] = useState(false)
    const [inputs, setInputs] = useState({});
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const handleChange = ({ target }) => {
        const name = target.name
        const value = target.value
        const data = new Date()
        const ano = data.getUTCFullYear()
        const mes = (data.getUTCMonth()+1) > 9 ? (data.getUTCMonth()+1) : '0' + (data.getUTCMonth()+1)
        const dia = data.getUTCDate() > 9 ? data.getUTCDate() : '0' + data.getUTCDate()
        setInputs(values => ({ ...values, [name]: value, data: `${dia}/${mes}/${ano}` }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setArray([...array, inputs])
        setInputs({ titulo: '', tipo: '', categoria: '', valor: '' })
       forceUpdate() 
    }

    const change = () => {
        setTurn(!turn)
    }

    useEffect(() => {
        localStorage.setItem('array', JSON.stringify(array))
    }, [array, setArray, filterAr, setFilter])

    return (
        <div className='menu-all'>
            
            <button className='btn menu' onClick={() => change()}>Adicionar</button>
           
            {
                turn &&
                <div className='modal'>
                    <span className='close' onClick={() => setTurn(false)}>X</span>
                    <h1>Adicionar</h1>
                    <form onSubmit={handleSubmit}>
                        <Input label='Título' value={inputs.titulo} name='titulo' type='text' onChange={handleChange} required={true} />
                        <Input label='Tipo' value={inputs.tipo} name='tipo' type='text' onChange={handleChange} required={true} />
                        <Input label='Categoria' value={inputs.categoria} name='categoria' type='text' onChange={handleChange} required={true} />
                        <Input label='Valor' value={inputs.valor} step=".01" min='0' name='valor' type='number' onChange={handleChange} required={true} />
                        <input className='btn btn-add' type="submit" value='Salvar' />
                    </form>
                </div>
            }
            
        </div>
    )
}

export default Create