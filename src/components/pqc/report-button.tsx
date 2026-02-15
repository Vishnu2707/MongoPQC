"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import jsPDF from "jspdf"

export function ReportButton({ data }: { data: any[] }) {
    const generateReport = () => {
        const doc = new jsPDF()

        doc.setFontSize(22)
        doc.text("Quantum-Resilience Audit Report", 20, 20)

        doc.setFontSize(12)
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30)
        doc.text(`Total Protected Records: ${data.length}`, 20, 40)

        doc.line(20, 45, 190, 45)

        doc.setFontSize(14)
        doc.text("Cryptographic Specification", 20, 55)
        doc.setFontSize(10)
        doc.text("- Algorithm: ML-KEM-1024 (Kyber)", 20, 65)
        doc.text("- Compliance: NIST FIPS 203 Standards", 20, 70)
        doc.text("- Entropy: 1024-bit Quantum-Safe Key", 20, 75)

        let y = 90
        doc.setFontSize(14)
        doc.text("Sample Verification (Last 5 Records)", 20, y)
        y += 10

        data.slice(0, 5).forEach((record, i) => {
            doc.setFontSize(9)
            doc.text(`${i + 1}. TXID: ${record.transactionId} | Latency: ${record.latencyMs?.toFixed(2)}ms`, 20, y)
            doc.text(`   Encapsulation: ${record.encapsulation?.substring(0, 40)}...`, 20, y + 5)
            y += 15
        })

        doc.save("Quantum-Resilience-Report.pdf")
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={generateReport}
            className="border-primary/20 hover:bg-primary/5"
        >
            <FileText className="mr-2 h-4 w-4" />
            Export Resilience Report
        </Button>
    )
}
