BASENAME = bare_conf
PDF = $(addsuffix .pdf, $(BASENAME))
TEX = $(addsuffix .tex, $(BASENAME))
PDFLATEX = pdflatex
BIBTEX = bibtex

.PHONY: clean all $(PDF)

all: $(PDF)

$(PDF): $(TEX) $(R_PLOT)
	$(PDFLATEX) $(BASENAME)
	$(BIBTEX) $(BASENAME)
	$(PDFLATEX) $(BASENAME)
	$(PDFLATEX) $(BASENAME)

clean:
	-rm -f $(PDF) $(addsuffix .aux, $(BASENAME)) $(addsuffix .log, $(BASENAME)) $(addsuffix .bbl, $(BASENAME)) $(addsuffix .blg, $(BASENAME)) $(addsuffix .blg, $(BASENAME)) 
