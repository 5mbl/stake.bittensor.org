// This could come from an API call or static data for the example
export default function handler(req, res) {
  const validators = [
    {
      name: "Owl Ventures",
      hotkey: "5CsvRJXuR955WojnGMdok1hbhffZyB4N5ocrv82f3p5A2zVp",
    },
    {
      name: "TAO-Validator.com",
      hotkey: "5EhvL1FVkQPpMjZX4MAADcW42i3xPSF1KiCpuaxTYVr28sux",
    },
    {
      name: "FirstTensor",
      hotkey: "5DvTpiniW9s3APmHRYn8FroUWyfnLtrsid5Mtn5EwMXHN2ed",
    },
    {
      name: "OpenTensor Foundation",
      hotkey: "5F4tQyWrhfGVcNhoqeiNsR6KjD4wMZ2kfhLj4oHYuyHbZAc3",
    },
  ];
  res.status(200).json(validators);
}
