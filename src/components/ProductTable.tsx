import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../hooks/useProduct";

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    const columns: ColumnsType<Product> = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Categoria",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Prezzo Acquisto",
            key: "purchasePrice",
            render: (_, record) => `€${record.additionalInfo.purchasePrice.toFixed(2)}`,
        },
        {
            title: "Prezzo Vendita",
            dataIndex: "salePrice",
            key: "salePrice",
            render: (value: number) => `€${value.toFixed(2)}`,
        },
        {
            title: "Quantità",
            key: "stockQuantity",
            render: (_, record) => record.additionalInfo.stockQuantity,
        },
        {
            title: "IVA",
            key: "vatRate",
            render: (_, record) => `${record.additionalInfo.vatRate}%`,
        },
        {
            title: "Creato il",
            key: "createdAt",
            render: (_, record) =>
                record.additionalInfo.createdAt
                    ? new Date(record.additionalInfo.createdAt).toLocaleDateString("it-IT")
                    : "-",
        },
    ];


    return (
        <Table columns={columns} dataSource={products} rowKey="id" />
    );
};

export default ProductTable;
