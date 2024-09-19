import { schemaTableType, TypeOfDoc } from "../redux/settingsSlice";

export const documentConstants = {
    TYPES_OF_DOC: [
        ['ACCEPT', 'Приемка товаров'],
        ['INVENTORY', 'Документ инвентаризации'],
        ['REVALUATION', 'Переоценка'],
        ['RETURN', 'Возврат поставщику'],
        ['WRITE_OFF', 'Списание'],
        ['SELL', 'Продажа'],
        ['PAYBACK', 'Возврат'],
        ['employees', 'Сотрудники'],
        ['ofd', 'Документы ОФД'],
        ['invoice', 'Первичка']
    ] as TypeOfDoc[]
}

export const documentSchemaOfTable: schemaTableType = {
    _id: ['', 0], // "66dc9016f011c44d24286c9c",
    docNumber: ['№ Док.', 1], // "new doc number 001",
    docDate: ['Дата', 1], // 1725729713874,
    docType: ['Тип документа', 1], //0,
    docSum: ['', 0],
    paymentStatus: ['Статус оплаты', 1],
    createStatus: ['', 0],
    seller:  ['Продавец', 0], /* {
        _id: "66d40adfb4137b9301fcd1c3",
        name: "Test Seller 2",
    } */
    products: ['', 0],
    __v: ['', 0],
    summa: ['Сумма', 1]
}
