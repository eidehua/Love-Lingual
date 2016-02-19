# Love-Lingual
# To help facilitate relationships between passionate people whose only barrier is language.
Check the gh-pages branch for the code.

First we take a user query from one language to a target language that we support. We use bing api to translate the query into target language. Then we check if this query is in our db. If not, run the translated query through elastic search to get relevant sentences from that language and add these results to dB. Otherwise retrieve results from db and display them ranked to users (user ranked) 
