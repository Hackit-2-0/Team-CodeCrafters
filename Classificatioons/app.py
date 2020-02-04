import os
import random
import PyPDF2
import sys

import collections
from tabula import read_pdf
from tabula import convert_into
import requests

file_name = 'sample.pdf'
write_file = 'text.json'

__default_page_size = 1
pdf_file = open(file_name, 'rb')
_readpdfFile = PyPDF2.PdfFileReader(pdf_file)
page_number = _readpdfFile.getNumPages()
const = collections.Counter(range(page_number))
for _pages in const:
    page = _readpdfFile.getPage(_pages)
    page_content = page.extractText()
    print(page_content.encode('utf-8'))
    with open('data.txt', 'ab') as rt:
        rt.write(page_content.encode('utf-8'))

convert_into(file_name, write_file, output_format="json")
