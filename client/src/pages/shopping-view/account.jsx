import Address from "@/components/shoppping-view/address";
import ShoppingOrders from "@/components/shoppping-view/order";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";


function ShoppingAccount() {
    return <div className="flex flex-col">
        <div className="relative h-[350px] w-full overflow-hidden">
            <img src="" alt="" />
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <Tabs defaultValue="orders">
                    <TabsList>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="address">Address</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders">
                        <ShoppingOrders />
                    </TabsContent>
                    <TabsContent value="address">
                        <Address />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </div>
}

export default ShoppingAccount;