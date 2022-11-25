export default async function sleep(ms: number | undefined) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}
