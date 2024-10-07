"use client";
import CsvUploader from "@/src/components/csv_uploader";
import ModalEx from "@/src/components/modalEx";

// 

export default function TestPage() {
    return (
        <div>
            <CsvUploader />
            <ModalEx modalIsOpen={false} content="Hello" />
        </div>
    )
}