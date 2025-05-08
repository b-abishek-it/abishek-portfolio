
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Mail, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

const MessagesManagement: React.FC = () => {
  const { messages, deleteMessage, markMessageAsRead } = useData();
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-portfolio-dark dark:text-white">Manage Messages</h2>
      </div>
      
      {messages.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            When someone sends you a message via the contact form, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.read ? "opacity-75" : ""}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {!message.read && (
                      <div className="w-2 h-2 bg-portfolio-primary rounded-full" />
                    )}
                    {message.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{message.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(message.date).toLocaleString()}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!message.read && (
                        <DropdownMenuItem onClick={() => markMessageAsRead(message.id)}>
                          <Mail className="mr-2 h-4 w-4" /> Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-red-600" 
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default MessagesManagement;
