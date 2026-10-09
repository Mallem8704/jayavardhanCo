export function BrandStatement() {
  return (
    <section
      id="statement"
      className="relative bg-[#F5F1E8] text-[#171A18] py-24 sm:py-36 md:py-44 px-6 overflow-hidden border-b border-[#DDD6C8]"
      aria-label="Firm perspective"
    >
      <div className="shell max-w-4xl mx-auto flex flex-col items-start space-y-8 sm:space-y-12">
        {/* Subtle Editorial Label */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#C5A880]" aria-hidden="true" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#53645A] font-semibold">
            A Clear Perspective
          </span>
        </div>

        {/* Huge Editorial Statement */}
        <div className="space-y-2 sm:space-y-4">
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#082C24]">
            Precision in the detail.
          </p>
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.12] tracking-[-0.03em] text-[#53645A] italic">
            Perspective for what’s next.
          </p>
        </div>

        {/* Revealed Supporting Truth */}
        <div className="pt-6 sm:pt-8 border-t border-[#DDD6C8] max-w-xl">
          <p className="text-base sm:text-lg md:text-xl text-[#171A18]/80 font-normal leading-relaxed">
            Financial decisions become easier when the numbers are understood clearly.
          </p>
        </div>
      </div>
    </section>
  );
}
