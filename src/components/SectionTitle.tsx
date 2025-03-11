import ShinyText from './ShinyText';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        <ShinyText text={title} className="text-gray-900 dark:text-white" speed={8} />
      </h2>
      <div className="w-20 h-1 mx-auto bg-blue-600 dark:bg-blue-400 rounded"></div>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
