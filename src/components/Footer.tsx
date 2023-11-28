const Footer = () => {
  const year = new Date().getFullYear();
  const subString = year === 2023 ? "" : `-${year}`;
  const TEXT = `2023${subString} PASSWORDSTASH`;

  return (
    <footer className="bg-black bg-opacity-25 text-white d-flex">
      <p className="mx-auto">&copy; {TEXT}</p>
    </footer>
  );
};

export default Footer;
