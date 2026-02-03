import { Modal, ModalHeader, ModalBody } from "@/components/ui/modal";
import { PDFIcon, XLSIcon } from "@/utils/icons";
import { exportToExcel, exportToPDF } from "@/utils/export";

export default function SedeBitacoraExportModal({ 
    open, 
    onClose, 
    data 
}: { 
    open: boolean, 
    onClose: () => void, 
    data: unknown[] 
}) {

    const handleExportExcel = () => {
        exportToExcel(data);
        onClose();
    };

    const handleExportPDF = () => {
        exportToPDF(data);
        onClose();
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            layoutId="export-logbook"
            className="absolute top-full right-0 left-auto translate-x-0 mt-2 w-[200px] z-50 shadow-xl border border-zinc-200 dark:border-zinc-800"
        >
            <ModalHeader title="Exportar" onClose={onClose}/>
            <ModalBody>
                <button 
                    onClick={handleExportExcel} 
                    className="flex flex-row gap-2 p-2 w-full items-center bg-transparent hover:scale-105 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer duration-200 text-black dark:text-white text-sm"
                >
                    <XLSIcon size={18} />
                    Excel
                </button>
                <button 
                    onClick={handleExportPDF} 
                    className="flex flex-row gap-2 p-2 w-full items-center bg-transparent hover:scale-105 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer duration-200 text-black dark:text-white text-sm"
                >
                    <PDFIcon size={18} />
                    PDF
                </button>
            </ModalBody>
        </Modal>
    );
}