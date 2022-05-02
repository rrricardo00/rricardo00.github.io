import React, { useContext, useEffect, useState } from 'react'
import { Api } from '../../Context/Api'
import './total.css'

const Total = () => {

    const { array, setArray } = useContext(Api)
    const [entrada, setEntrada] = useState('')
    const [saida, setSaida] = useState('')


    useEffect(() => {
        if (array.length > 0) {
            array.filter(item => item.tipo === 'Entrada').length > 0 && setEntrada(array.filter(item => item.tipo === 'Entrada').map(item => item.valor).reduce((item, valor) => (+item) + (+valor),))
            array.filter(item => item.tipo === 'Saída').length > 0 && setSaida(array.filter(item => item.tipo === 'Saída').map(item => item.valor).reduce((item, valor) => (+item) + (+valor),))
        }

    }, [array, setArray])

    return (
        <div className='total'>
            <div className='total-container'>
                <div>
                    <p>Entrada</p>
                    <p>R$ {entrada}</p>
                </div>
                {saida &&
                    <div>
                        <p>Saída</p>
                        <p>R$ {saida}</p>
                    </div>
                }
                <div>
                    <p>Total</p>
                    <p>R$ {entrada - saida}</p>
                </div>
            </div>
        </div>
    )
}

export default Total