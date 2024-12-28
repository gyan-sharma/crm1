import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { PricingComponent } from '../../types/pricing';
import db from '../../lib/db';

interface ExcelUploaderProps {
  onUploadComplete: () => void;
}

export default function ExcelUploader({ onUploadComplete }: ExcelUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processExcelData = async (data: any[]) => {
    const components: Omit<PricingComponent, 'id'>[] = data
      .filter(row => row.PRETTY_NAME && row.TYPE && row.SIZE && row.PRICE)
      .map(row => ({
        prettyName: row.PRETTY_NAME,
        type: row.TYPE,
        size: row.SIZE,
        hourlyPrice: Number(row.PRICE),
        monthlyPrice: Number(row.PRICE) * 730,
        created_at: new Date().toISOString()
      }));

    await db.pricingComponents.clear(); // Clear existing data
    await db.pricingComponents.bulkAdd(
      components.map(comp => ({
        ...comp,
        id: crypto.randomUUID()
      }))
    );
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      await processExcelData(jsonData);
      onUploadComplete();
    } catch (error) {
      console.error('Error processing Excel file:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Pricing Excel
      </button>
    </div>
  );
}