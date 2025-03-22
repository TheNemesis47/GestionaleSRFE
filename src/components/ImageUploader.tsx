import { Button } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import {useRef} from "react";

interface ImageUploaderProps {
    selectedImages: File[];
    setSelectedImages: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ selectedImages, setSelectedImages }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-3">
            <label>Immagini</label>
            <div>
                <Button variant="outline-secondary" onClick={handleImageButtonClick}>
                    <FaPlus /> Aggiungi Immagini
                </Button>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
            </div>

            {selectedImages.length > 0 && (
                <div className="mt-2">
                    <strong>File selezionati:</strong>
                    <ul className="list-group mt-2">
                        {selectedImages.map((file, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {file.name}
                                <FaTrash
                                    style={{ cursor: "pointer", color: "red" }}
                                    onClick={() => handleRemoveImage(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
