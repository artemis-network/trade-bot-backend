import { Exchange, Market } from "../enums";

export const bots = [
  {
    name: "ADA Bot",
    pricePerMonth: 100,
    exchange: Exchange.BINANCE,
    status: true,
    market: Market.FUTURES,
  },
  {
    name: "XRP Bot",
    pricePerMonth: 100,
    exchange: Exchange.BINANCE,
    status: true,
    market: Market.FUTURES,
  },
  {
    name: "LINK Bot",
    pricePerMonth: 100,
    exchange: Exchange.KUCOIN,
    status: true,
    market: Market.SPOT,
  },
  {
    name: "BCH Bot",
    pricePerMonth: 100,
    exchange: Exchange.KUCOIN,
    status: true,
    market: Market.FUTURES,
  },
  {
    name: "ADA Bot",
    pricePerMonth: 100,
    exchange: Exchange.KUCOIN,
    status: true,
    market: Market.SPOT,
  },
  {
    name: "BNX Bot",
    pricePerMonth: 101,
    exchange: Exchange.KUCOIN,
    status: true,
    market: Market.SPOT,
  },
  {
    name: "DODGE Bot",
    pricePerMonth: 100,
    exchange: Exchange.BINANCE,
    status: true,
    market: Market.SPOT,
  },
];
