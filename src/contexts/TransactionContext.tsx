import { createContext, useEffect, useState } from 'react'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionContextType {
  transactions: Transaction[]
}

interface TransactionProviderProps {
  readonly children: React.ReactNode
}

export const transactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()
    setTransactions(data)
    console.log(data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <transactionsContext.Provider value={{ transactions }}>
      {children}
    </transactionsContext.Provider>
  )
}
