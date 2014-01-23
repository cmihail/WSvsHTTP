BASENAME = bare_conf
PDF = $(addsuffix .pdf, $(BASENAME))
OUTPUT_PDF="comparative_web_protocol_performance_analysis.pdf"
TEX = $(addsuffix .tex, $(BASENAME))
PDFLATEX = pdflatex
BIBTEX = bibtex

.PHONY: clean all $(PDF)

all: $(PDF)

$(PDF): $(TEX)
	$(PDFLATEX) $(BASENAME)
	$(BIBTEX) $(BASENAME)
	$(PDFLATEX) $(BASENAME)
	$(PDFLATEX) $(BASENAME)
	mv $(PDF) $(OUTPUT_PDF)

clean:
	-rm -f $(PDF) $(addsuffix .aux, $(BASENAME)) $(addsuffix .log, $(BASENAME)) $(addsuffix .bbl, $(BASENAME)) $(addsuffix .blg, $(BASENAME)) $(addsuffix .blg, $(BASENAME)) 
