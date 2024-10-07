import React, { useState } from 'react';
import ParseCsv from "./parse_csv";
import { CsvRes } from '../types/csvRes';

const PostUrl = '#';

const CsvUploader = () => {
    const [file, setFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };
    const handleSubmit = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csv = e.target?.result;
                if (typeof csv === 'string') {
                    const rescsv: CsvRes[] = ParseCsv(csv);
                    console.log(rescsv);

                    // rescsvがstringでなければ、PostUrlにPOSTする
                    if (rescsv.length > 0) {
                        fetch(PostUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(rescsv),
                        })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error('Error:', error));
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleSubmit}>送信</button>
        </div>
    );
};

export default CsvUploader;