import { Product } from "src/modules/product/entities/product.entity";

class Producer {
    document: string;
    producerName: string;
    city: string;
    state: string;
    farmableProducts: Product[];
    farm: Farm;
    isCompany: boolean;
}

class Farm{
    name:string;
    totalArea: number;
    greenArea: number;
    farmableArea: number;
}

export { Farm, Producer}