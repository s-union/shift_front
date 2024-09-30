"use client";
import CsvUploader from "@/src/component/csv_uploader";
import ModalEx from "@/src/component/modalEx";

// 

export default function TestPage() {
    return (
        <div>
            <CsvUploader />
            <ModalEx modalIsOpen={false} content="Hello" />
        </div>
    )
}