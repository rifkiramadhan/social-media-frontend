import ScrollToTop from 'react-scroll-to-top';

export default function backToTopBtn() {
  return (
    <div>
      <ScrollToTop
        className='flex justify-center items-center'
        viewBox='0 0 384 512'
        svgPath='M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z'
        smooth
        top={1000}
      />
    </div>
  );
}
