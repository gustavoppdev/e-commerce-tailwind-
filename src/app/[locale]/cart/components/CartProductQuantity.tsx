import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { ItemCartType } from "@/hooks/useCartDetails";

type Props = {
  item: ItemCartType;
  styles?: string;
};

const CartProductQuantity = ({ item, styles }: Props) => {
  const { updateQuantity } = useCart();

  const handleUpdateQuantity = (quantity: string) => {
    updateQuantity(item.id, item.variantKey, Number(quantity));
  };

  return (
    <div className={styles}>
      <Select onValueChange={handleUpdateQuantity}>
        <SelectTrigger
          className="w-15"
          defaultValue={item.quantity.toString()}
          aria-label={`Select quantity for ${item.name}`}
        >
          <SelectValue placeholder={item.quantity.toString()} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({
            length: (item.stock ?? 0 > 5) ? 5 : (item.stock ?? 0),
          }).map((_, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CartProductQuantity;
