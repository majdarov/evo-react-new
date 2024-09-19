import { schemaTableType } from "../redux/settingsSlice";

export const schemaOfTable: schemaTableType = {
    id: ['', 0],
    name: ['Наименование', 1],
    code: ['', 0],
    measure_name: ['', 0],
    tax: ['', 0],
    allow_to_sell: ['', 0],
    description: ['', 0],
    article_number: ['Артикул', 1],
    parent_id: ['', 0],
    type: ['', 0],
    price: ['Цена', 1],
    cost_price: ['', 0],
    quantity: ['Количество', 1],
    barcodes: ['', 0],
}
