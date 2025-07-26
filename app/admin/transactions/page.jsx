"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Filter,
  Search,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePicker } from "@/components/ui/date-picker"

// Datos de ejemplo para transacciones
const initialTransactions = [
  {
    id: "tx-1",
    type: "received",
    amount: "250 KII",
    usdValue: "$125.00",
    date: "12/05/2023 14:32",
    sender: "María Rodríguez",
    senderAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    recipient: "Juan Pérez",
    recipientAddress: "0x9i8u7y6t5r4e3w2q1p0o",
    status: "completed",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    network: "kii",
    method: "web",
    description: "Pago por suscripción premium",
    fee: "0.001 KII",
    productId: "prod-1",
    productName: "Suscripción Premium",
    siteOrigin: "https://tienda-ejemplo.com",
  },
  {
    id: "tx-2",
    type: "sent",
    amount: "100 KII",
    usdValue: "$50.00",
    date: "05/05/2023 09:15",
    sender: "Carlos Gómez",
    senderAddress: "0x2w3e4r5t6y7u8i9o0p",
    recipient: "Ana Martínez",
    recipientAddress: "0x9i8u7y6t5r4e3w2q1p0o",
    status: "completed",
    txHash: "0x9i8u7y6t5r4e3w2q1p0o9i8u7y6t5r4e3w2q1p0o",
    network: "kii",
    method: "sms",
    description: "Pago por servicios",
    fee: "0.001 KII",
    productId: "prod-2",
    productName: "Servicio de Consultoría",
    siteOrigin: "SMS Payment",
  },
  {
    id: "tx-3",
    type: "received",
    amount: "500 KII",
    usdValue: "$250.00",
    date: "01/05/2023 18:45",
    sender: "Ana Martínez",
    senderAddress: "0x2w3e4r5t6y7u8i9o0p",
    recipient: "Laura Sánchez",
    recipientAddress: "0x3e4r5t6y7u8i9o0p1a",
    status: "completed",
    txHash: "0x2w3e4r5t6y7u8i9o0p2w3e4r5t6y7u8i9o0p2w3e",
    network: "kii",
    method: "web",
    description: "Pago por producto digital",
    fee: "0.001 KII",
    productId: "prod-3",
    productName: "E-book Premium",
    siteOrigin: "https://libros-digitales.com",
  },
  {
    id: "tx-4",
    type: "sent",
    amount: "75 KII",
    usdValue: "$37.50",
    date: "25/04/2023 11:20",
    sender: "Javier López",
    senderAddress: "0x3e4r5t6y7u8i9o0p1a",
    recipient: "Miguel Fernández",
    recipientAddress: "0x4r5t6y7u8i9o0p1a2s",
    status: "completed",
    txHash: "0x3e4r5t6y7u8i9o0p1a3e4r5t6y7u8i9o0p1a3e4r",
    network: "kii",
    method: "web",
    description: "Pago por consultoría",
    fee: "0.001 KII",
    productId: "prod-4",
    productName: "Consultoría Técnica",
    siteOrigin: "https://consultores-tech.com",
  },
  {
    id: "tx-5",
    type: "received",
    amount: "300 KII",
    usdValue: "$150.00",
    date: "20/04/2023 16:10",
    sender: "Laura Sánchez",
    senderAddress: "0x4r5t6y7u8i9o0p1a2s",
    recipient: "Elena Gutiérrez",
    recipientAddress: "0x5t6y7u8i9o0p1a2s3d",
    status: "completed",
    txHash: "0x4r5t6y7u8i9o0p1a2s4r5t6y7u8i9o0p1a2s4r5t",
    network: "kii",
    method: "sms",
    description: "Pago por suscripción mensual",
    fee: "0.001 KII",
    productId: "prod-5",
    productName: "Suscripción Mensual",
    siteOrigin: "SMS Payment",
  },
  {
    id: "tx-6",
    type: "sent",
    amount: "150 KII",
    usdValue: "$75.00",
    date: "15/04/2023 08:30",
    sender: "Miguel Fernández",
    senderAddress: "0x5t6y7u8i9o0p1a2s3d",
    recipient: "Pablo Ruiz",
    recipientAddress: "0x6y7u8i9o0p1a2s3d4f",
    status: "pending",
    txHash: "0x5t6y7u8i9o0p1a2s3d5t6y7u8i9o0p1a2s3d5t6y",
    network: "kii",
    method: "web",
    description: "Pago por diseño gráfico",
    fee: "0.001 KII",
    productId: "prod-6",
    productName: "Diseño Gráfico Premium",
    siteOrigin: "https://disenos-creativos.com",
  },
  {
    id: "tx-7",
    type: "received",
    amount: "1000 KII",
    usdValue: "$500.00",
    date: "10/04/2023 14:00",
    sender: "Elena Gutiérrez",
    senderAddress: "0x6y7u8i9o0p1a2s3d4f",
    recipient: "Carlos Gómez",
    recipientAddress: "0x7u8i9o0p1a2s3d4f5g",
    status: "completed",
    txHash: "0x6y7u8i9o0p1a2s3d4f6y7u8i9o0p1a2s3d4f6y7u",
    network: "kii",
    method: "web",
    description: "Pago por desarrollo web",
    fee: "0.002 KII",
    productId: "prod-7",
    productName: "Desarrollo Web Completo",
    siteOrigin: "https://desarrollo-web-pro.com",
  },
  {
    id: "tx-8",
    type: "sent",
    amount: "200 KII",
    usdValue: "$100.00",
    date: "05/04/2023 10:45",
    sender: "Pablo Ruiz",
    senderAddress: "0x7u8i9o0p1a2s3d4f5g",
    recipient: "María Rodríguez",
    recipientAddress: "0x8i9o0p1a2s3d4f5g6h",
    status: "failed",
    txHash: "0x7u8i9o0p1a2s3d4f5g7u8i9o0p1a2s3d4f5g7u8i",
    network: "kii",
    method: "sms",
    description: "Pago por consultoría",
    fee: "0.001 KII",
    error: "Fondos insuficientes",
    productId: "prod-8",
    productName: "Consultoría Financiera",
    siteOrigin: "SMS Payment",
  },
]

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Filtrar transacciones basado en búsqueda y filtros
  const filteredTransactions = transactions.filter((transaction) => {
    // Filtro de búsqueda
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.description && transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.sender && transaction.sender.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.recipient && transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.siteOrigin && transaction.siteOrigin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.productName && transaction.productName.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filtro de tipo
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    // Filtro de método
    const matchesMethod = methodFilter === "all" || transaction.method === methodFilter

    // Filtro de fecha
    let matchesDate = true
    if (startDate && endDate) {
      const txDate = new Date(transaction.date.split(" ")[0].split("/").reverse().join("-"))
      const start = new Date(startDate)
      const end = new Date(endDate)
      matchesDate = txDate >= start && txDate <= end
    }

    return matchesSearch && matchesType && matchesStatus && matchesMethod && matchesDate
  })

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copiado al portapapeles")
      })
      .catch((err) => {
        console.error("Error al copiar: ", err)
      })
  }

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction)
  }

  const totalVolume = filteredTransactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + Number.parseFloat(tx.amount.split(" ")[0]), 0)

  const totalFees = filteredTransactions
    .filter((tx) => tx.status === "completed")
    .reduce((sum, tx) => sum + Number.parseFloat(tx.fee.split(" ")[0]), 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Transacciones</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros Avanzados
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volumen Total</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVolume.toFixed(2)} KII</div>
            <p className="text-xs text-muted-foreground">${(totalVolume * 0.5).toFixed(2)} USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comisiones Generadas</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFees.toFixed(3)} KII</div>
            <p className="text-xs text-muted-foreground">${(totalFees * 0.5).toFixed(2)} USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones Totales</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.filter((tx) => tx.status === "completed").length} completadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las Transacciones</CardTitle>
          <CardDescription>Monitorea todas las transacciones procesadas en la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, hash, usuario, producto, sitio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="received">Recibidas</SelectItem>
                  <SelectItem value="sent">Enviadas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="failed">Fallidas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los métodos</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Fecha</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Filtrar por Fecha</DialogTitle>
                    <DialogDescription>Selecciona un rango de fechas para filtrar las transacciones.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Fecha Inicio</label>
                        <DatePicker selected={startDate} onSelect={setStartDate} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Fecha Fin</label>
                        <DatePicker selected={endDate} onSelect={setEndDate} />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setStartDate(null)
                          setEndDate(null)
                        }}
                      >
                        Limpiar
                      </Button>
                      <Button type="button" onClick={() => {}}>
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID / Fecha</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Producto / Origen</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">{transaction.id}</div>
                        <div className="text-xs text-slate-500">{transaction.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
                              transaction.type === "received" ? "bg-green-100" : "bg-amber-100"
                            }`}
                          >
                            {transaction.type === "received" ? (
                              <ArrowDown className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowUp className="h-4 w-4 text-amber-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">De: {transaction.sender}</div>
                            <div className="text-xs text-slate-500">A: {transaction.recipient}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{transaction.amount}</div>
                        <div className="text-xs text-slate-500">{transaction.usdValue}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium" title={transaction.productName}>
                          {transaction.productName}
                        </div>
                        <div className="text-xs text-slate-500 truncate max-w-[200px]" title={transaction.siteOrigin}>
                          {transaction.siteOrigin}
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            {transaction.method === "web" ? "Web" : "SMS"}
                          </Badge>
                          <Badge variant="outline" className="text-xs ml-1">
                            Kii Network
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {transaction.status === "completed"
                            ? "Completada"
                            : transaction.status === "pending"
                              ? "Pendiente"
                              : "Fallida"}
                        </Badge>
                        {transaction.status === "failed" && transaction.error && (
                          <div className="text-xs text-red-500 mt-1">{transaction.error}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleCopy(transaction.txHash)}
                          >
                            <span className="sr-only">Copiar Hash</span>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => window.open(`https://kii-explorer.com/tx/${transaction.txHash}`, "_blank")}
                          >
                            <span className="sr-only">Ver en Explorer</span>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(transaction)}
                          >
                            <span className="sr-only">Ver Detalles</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No se encontraron transacciones. Intenta con una búsqueda diferente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-slate-500">
            Mostrando {filteredTransactions.length} de {transactions.length} transacciones
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Diálogo de detalles de transacción */}
      {selectedTransaction && (
        <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Detalles de la Transacción</DialogTitle>
              <DialogDescription>Información detallada sobre la transacción {selectedTransaction.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">ID:</span>
                      <span className="font-medium">{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tipo:</span>
                      <span className="font-medium">
                        {selectedTransaction.type === "received" ? "Recibido" : "Enviado"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estado:</span>
                      <Badge
                        className={`${
                          selectedTransaction.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : selectedTransaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {selectedTransaction.status === "completed"
                          ? "Completada"
                          : selectedTransaction.status === "pending"
                            ? "Pendiente"
                            : "Fallida"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fecha:</span>
                      <span className="font-medium">{selectedTransaction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Método:</span>
                      <span className="font-medium">{selectedTransaction.method === "web" ? "Web" : "SMS"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Red:</span>
                      <span className="font-medium">Kii Network</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Detalles Financieros</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cantidad:</span>
                      <span className="font-medium">{selectedTransaction.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Valor USD:</span>
                      <span className="font-medium">{selectedTransaction.usdValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Comisión:</span>
                      <span className="font-medium">{selectedTransaction.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Remitente:</span>
                      <span className="font-medium">{selectedTransaction.sender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Destinatario:</span>
                      <span className="font-medium">{selectedTransaction.recipient}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Producto:</span>
                      <span className="font-medium">{selectedTransaction.productName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Información de Blockchain</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hash de Transacción:</span>
                    <div className="flex items-center">
                      <span className="font-medium truncate max-w-[250px]" title={selectedTransaction.txHash}>
                        {selectedTransaction.txHash.substring(0, 20)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => handleCopy(selectedTransaction.txHash)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dirección Remitente:</span>
                    <div className="flex items-center">
                      <span className="font-medium truncate max-w-[250px]" title={selectedTransaction.senderAddress}>
                        {selectedTransaction.senderAddress.substring(0, 10)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => handleCopy(selectedTransaction.senderAddress)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dirección Destinatario:</span>
                    <div className="flex items-center">
                      <span className="font-medium truncate max-w-[250px]" title={selectedTransaction.recipientAddress}>
                        {selectedTransaction.recipientAddress.substring(0, 10)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => handleCopy(selectedTransaction.recipientAddress)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Descripción:</span>
                    <span className="font-medium">{selectedTransaction.description || "Sin descripción"}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Información de Origen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sitio de Origen:</span>
                    <span className="font-medium">{selectedTransaction.siteOrigin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ID de Producto:</span>
                    <span className="font-medium">{selectedTransaction.productId}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://kii-explorer.com/tx/${selectedTransaction.txHash}`, "_blank")}
                >
                  Ver en Kii Explorer
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

