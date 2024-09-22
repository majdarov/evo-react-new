import React from 'react'
import s from './Docs.module.css'
import Table from '../common/Table';

const Docs = () => {

    return (
        <div className={s.parent}>
            <div className={s.docnumber}>
                <h2>Docs number</h2>
                <ul>
                    <li id='seller1'>Seller1
                        <ul>
                            <li id='number1'>
                                <span>Number1</span>
                            </li>
                            <li id='number2'>
                                <span>Number2</span>
                            </li>
                        </ul>
                    </li>
                    <li id='seller2'>Seller2
                        <ul>
                            <li id='number1'>
                                <span>Number1</span>
                            </li>
                            <li id='number2'>
                                <span>Number2</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={s.docdetail}>
                <h2>Table</h2>
                <pre>
                | product name1 | quant | price | cost_price | <br />
                | product name2 | quant | price | cost_price | <br />
                | product name3 | quant | price | cost_price | <br />
                | product name 4| quant | price | cost_price | <br />
                </pre>
                    {/* <Table /> */}
            </div>
        </div>
    )
}

export default Docs;
