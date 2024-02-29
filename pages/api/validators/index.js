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
    {
      name: "Tao Bridge",
      hotkey: "5FLKnbMjHY8LarHZvk2q2RY9drWFbpxjAcR5x8tjr3GqtU6F",
    },
    {
      name: "Bittensor Guru",
      hotkey: "5HK5tp6t2S59DywmHRWPBVJeJ86T61KjurYqeooqj8sREpeN",
    },
    {
      name: "TaoStation",
      hotkey: "5HeKSHGdsRCwVgyrHchijnZJnq4wiv6GqoDLNah8R5WMfnLB",
    },
    {
      name: "Vune",
      hotkey: "5ECvRLMj9jkbdM4sLuH5WvjUe87TcAdjRfUj5onN4iKqYYGm",
    },
    {
      name: "TaoPolishNode",
      hotkey: "5H6BgKkAr2Anmm9Xw5BVDE4VaQmFEVMkJUHeT7Gki4J7yF4x",
    },
    {
      name: "RoundTable21",
      hotkey: "5FFApaS75bv5pJHfAp2FVLBj9ZaXuFDjEypsaBNc1wCfe52v",
    },
    {
      name: "Foundry",
      hotkey: "5HEo565WAy4Dbq3Sv271SAi7syBSofyfhhwRNjFNSM2gP9M2",
    },
    {
      name: "Taostats & Corcel",
      hotkey: "5Hddm3iBFD2GLT5ik7LZnT3XJUnRnN8PoeCFgGQgawUVKNm8",
    },
    {
      name: "Giga Corporation",
      hotkey: "5ED6jwDECEmNvSp98R2qyEUPHDv9pi14E6n3TS8CicD6YfhL",
    },
    {
      name: "PRvalidator",
      hotkey: "5FFM6Nvvm78GqyMratgXXvjbqZPi7SHgSQ81nyS96jBuUWgt",
    },
    {
      name: "North Tensor",
      hotkey: "5Fq5v71D4LX8Db1xsmRSy6udQThcZ8sFDqxQFwnUZ1BuqY5A",
    },
  ];
  res.status(200).json(validators);
}
