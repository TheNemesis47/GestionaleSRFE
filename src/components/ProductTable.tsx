import React, { useState } from "react";
import {
    Table,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Typography,
} from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";

import { Product } from "../hooks/useProduct";
import { fetchWithAuth } from "../static/api";
import "../mouse.css";
import type { ColumnsType, ColumnType } from "antd/es/table";


/**
 * Definiamo un tipo di colonna "editabile"
 * estendendo la ColumnType di Ant Design con la proprietà `editable`.
 */
type EditableColumnType = ColumnType<Product> & {
    editable?: boolean;
};

/**
 * Cella editabile:
 * - Se `editing` è true, mostriamo un <Input/> o <InputNumber/>
 * - Altrimenti, mostriamo il contenuto originale
 */
const EditableCell: React.FC<{
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: Product;
    index: number;
    children: React.ReactNode;
}> = ({
          editing,
          dataIndex,
          title,
          inputType,
          record,
          index,
          children,
          ...restProps
      }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please input ${title}!` }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

interface ProductTableProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductTable: React.FC<ProductTableProps> = ({
                                                       products,
                                                       setProducts,
                                                   }) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<string>("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // Controlla se la riga è in modalità editing
    const isEditing = (record: Product) => record.id?.toString() === editingKey;

    // Avvia la modalità editing: inizializza il form con i valori della riga
    const edit = (record: Product) => {
        // Rimosse le assegnazioni duplicate
        // e lasciato solo lo spread di record.
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id?.toString() || "");
    };

    // Annulla la modalità editing
    const cancel = () => {
        setEditingKey("");
    };

    // Salva le modifiche: valida il form, aggiorna la riga sul server e nello stato
    const save = async (key: string) => {
        try {
            const row = await form.validateFields();
            const newData = [...products];
            const index = newData.findIndex((item) => item.id?.toString() === key);

            if (index > -1) {
                const item = newData[index];
                const updatedItem = { ...item, ...row };
                const productId = updatedItem.id;

                // PUT al server
                await fetchWithAuth(`/api/product/${productId}`, "PUT", updatedItem);

                // Aggiorna lo stato locale
                newData.splice(index, 1, updatedItem);
                setProducts(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    // Gestisce l'eliminazione di una riga
    const handleDelete = async (key: string) => {
        await fetchWithAuth(`/api/product/${key}`, "DELETE");
        const newData = products.filter((item) => item.id?.toString() !== key);
        setProducts(newData);
    };

    // Definizione delle colonne base della tabella
    const columns: EditableColumnType[] = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            editable: true,
        },
        {
            title: "Categoria",
            dataIndex: "category",
            key: "category",
            editable: true,
        },
        {
            title: "Prezzo Acquisto",
            dataIndex: "purchasePrice",
            key: "purchasePrice",
            editable: true,
            render: (price?: number) =>
                price !== undefined ? `€${price.toFixed(2)}` : "N/A",
        },
        {
            title: "Prezzo Vendita",
            dataIndex: "salePrice",
            key: "salePrice",
            editable: true,
            render: (price?: number) =>
                price !== undefined ? `€${price.toFixed(2)}` : "N/A",
        },
        {
            title: "Quantità",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
            editable: true,
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags?: string[]) =>
                tags ? tags.map((tag) => tag.toUpperCase()).join(", ") : "",
        },
        {
            title: "Operazioni",
            dataIndex: "operation",
            key: "operation",
            render: (_: unknown, record: Product) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.id?.toString() || "")}
                style={{ marginRight: 8 }}
            >
              <FcApproval />
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <FaX className="icon-action text-danger" />
            </Popconfirm>
          </span>
                ) : (
                    <span>
            <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
            >
              <FaEdit />
            </Typography.Link>
            <Popconfirm
                title="Sicuro di Eliminare??"
                onConfirm={() => handleDelete(record.id?.toString() || "")}
            >
              <a style={{ marginLeft: 8 }}>
                <MdDelete className="text-danger" />
              </a>
            </Popconfirm>
          </span>
                );
            },
        },
    ];

    // Aggiunge la proprietà onCell alle colonne editabili, in modo che l'EditableCell riceva i parametri necessari
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Product, rowIndex: number) => ({
                record,
                inputType:
                    col.dataIndex === "purchasePrice" ||
                    col.dataIndex === "salePrice" ||
                    col.dataIndex === "stockQuantity"
                        ? "number"
                        : "text",
                dataIndex: col.dataIndex as string, // cast a string
                title: col.title as string,         // cast a string
                editing: isEditing(record),
                index: rowIndex,
            }),
        };
    });

    // Aggiunge la possibilità di selezionare le righe
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
            // Eventuali azioni sui record selezionati...
        },
    };

    return (
        <Form form={form} component={false}>
            <Table<Product>
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowKey="id"
                dataSource={products}
                columns={mergedColumns}
                rowSelection={rowSelection}
                pagination={{
                    onChange: cancel,
                }}
                bordered={false}
                style={{ border: "none" }}
            />
        </Form>
    );
};

export default ProductTable;
