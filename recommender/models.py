import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel

def merge_csv_data():
  df1 = pd.read_csv('./data/nga_objects.csv', index_col=False, dtype='unicode')
  df2 = pd.read_csv('./data/nga_images.csv', index_col=False, dtype='unicode')

  df = pd.merge(df1, df2, how='inner', left_on='objectid', right_on='depictstmsobjectid')
  df.to_csv('data/nga_merged.csv', index=False)

def create_sample_data():
  art_df = pd.read_csv('data/nga_merged.csv', index_col=False, dtype='unicode')
  art_df.rename(columns={'objectid': 'id'}, inplace=True)
  new_art_df = pd.DataFrame()
  for i in art_df['visualbrowsertimespan'].unique():
    temp = art_df[art_df['visualbrowsertimespan'] == i]
    if temp.shape[0] < 1000:
      temp = temp
    else:
      temp = temp.sample(1000)
    new_art_df = pd.concat([new_art_df, temp]) 
  new_art_df = new_art_df.drop_duplicates(subset='id')
  new_art_df.to_csv('data/nga_merged_sampled.csv', index=False)

art_df = pd.read_csv('data/nga_merged_sampled.csv', index_col=False, dtype='unicode')

art_df['title'] = art_df['title'].fillna('')
art_df['medium'] = art_df['medium'].fillna('')
art_df['visualbrowsertimespan'] = art_df['visualbrowsertimespan'].fillna('')
art_df['attribution'] = art_df['attribution'].fillna('')

tfv = TfidfVectorizer(min_df=3, max_features=None,
                      strip_accents='unicode', analyzer='word', token_pattern=r'\w{1,}',
                      ngram_range=(1, 3), 
                      stop_words='english')
tfv_matrix = tfv.fit_transform(art_df['title'] + ' ' + art_df['medium'] + ' ' + art_df['visualbrowsertimespan'] + ' ' + art_df['attribution'])
sig = sigmoid_kernel(tfv_matrix, tfv_matrix)
indexes = pd.Series(art_df.index, index=art_df['id']).drop_duplicates()

# generate image embeddings - cosine similarity
# clip - open ai model

def get_content_based_rec(id, sig=sig):
  idx = indexes[id]
  sig_scores = list(enumerate(sig[idx]))
  sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
  sig_scores = sig_scores[1:5]
  art_indices = [i[0] for i in sig_scores]
  return art_df['id'].iloc[art_indices]

def get_collaborative_filtering_rec():
  # simulate some data - to test
  pass

def get_random_rec():
  return art_df.sample(4)

def get_by_popularity_rec():
  # split between 10% explore and 90% exploit
  pass

def get_by_subset_popularity_rec():
  # age and gender
  pass

# print(get_content_based_rec('41321'))