
import { GroceryStore } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  groceryStore: GroceryStore;
};

const GroceryStoreInfo = ({ groceryStore }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {groceryStore.groceryStoreName}
        </CardTitle>
        <CardDescription>
          {groceryStore.city}, {groceryStore.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {groceryStore.categories.map((Product, index) => (
          <span className="flex">
            <span>{Product}</span>
            {index < groceryStore.categories.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default GroceryStoreInfo;
