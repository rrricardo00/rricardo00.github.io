import React, { useContext, useEffect, useState } from 'react'
import { Api } from '../../Context/Api';
import Input from '../input/Input';

import './filter.css'

const Filter = () => {

    const { array, setFilter, setVal  } = useContext(Api)
    const [, setAr] = useState()
    const [inputs, setInputs] = useState({});
    const [validate, setValidate] = useState(false);

    const handleChange = ({ target }) => {
        const name = target.name
        const value = target.value

        setInputs(values => ({ ...values, [name]: value }))
    }

    const valid = () => {
        setValidate(!validate)
    }

    const filter = () => {
        if ((inputs.tipo || inputs.categoria) && (inputs.tipo !== '' || inputs.categoria !== '')) {
            const ar = array.filter(item => item.tipo.includes(inputs.tipo) || item.categoria === inputs.categoria)
            setAr(ar)
            localStorage.setItem('filter', JSON.stringify(ar))
            setFilter(JSON.parse(localStorage.getItem('filter')))
            setVal(true)
        } else{
            setFilter(JSON.parse(localStorage.getItem('array')))
            setVal(false)
        }
    }

    useEffect(()=>{
        setFilter(JSON.parse(localStorage.getItem('array')))
    },[setFilter])

    return (
        <div className='menu-all flex'>
            <button className='btn menu' onClick={valid}>Filtrar</button>
            {validate &&
                <div >
                    <label>
                        Tipo
                        <select name='tipo' value={inputs.tipo} onChange={handleChange}>
                            <option value=''>Todos</option>
                            <option value='Entrada'>Entrada</option>
                            <option value='Saída'>Saída</option>
                        </select>
                    </label>

                    <Input label='Categoria' value={inputs.categoria} name='categoria' type='text' onChange={handleChange} required={true} />
                    <button className='btn menu' onClick={filter}>Filtrar</button>
                </div>
            }



        </div>
    )
}

export default Filter