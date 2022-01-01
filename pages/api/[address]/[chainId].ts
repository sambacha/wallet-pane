import { balanceOf } from '@features/wallet';

// TODO: Error Handling
export default async function handler(req: { query: { address: any; chainId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) {
  const { address, chainId } = req.query;

  const responseData = await balanceOf(address, chainId).catch((e) =>
    res.status(400).json(e.message),
  );
  res.status(200).json(responseData);
}
