"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowRight, XCircle } from "lucide-react"

export default function Queue() {
  const [queue, setQueue] = useState<string[]>([])
  const [newItem, setNewItem] = useState("")

  const enqueue = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim()) {
      setQueue([...queue, newItem.trim()])
      setNewItem("")
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">CMPU-203 Coach Question Queue</h2>
        <p className="text-muted-foreground">Current size: {queue.length}</p>
      </div>

      <form onSubmit={enqueue} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="item">Add Item</Label>
          <div className="flex gap-2">
            <Input id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Enter an item" />
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Queue Items</h3>
        </div>

        <div className="space-y-2">
          {queue.length === 0 ? (
            <Card className="p-4 text-center text-muted-foreground">Queue is empty</Card>
          ) : (
            queue.map((item, index) => (
              <Card
                key={index}
                className={`p-4 flex items-center justify-between ${index === 0 ? "bg-primary/5" : ""}`}
              >
                <span className="font-medium">{item}</span>
                <div className="flex items-center gap-2">
                  <div className="text-muted-foreground flex items-center gap-2">
                    {index === 0 && <span className="text-sm">Front</span>}
                    {index === queue.length - 1 && <span className="text-sm">Back</span>}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      const newQueue = [...queue]
                      newQueue.splice(index, 1)
                      setQueue(newQueue)
                    }}
                    aria-label={`Remove ${item} from queue`}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

