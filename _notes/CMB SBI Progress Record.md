---
layout: note
title: CMB SBI Progress Record
date: 2025-03-17
last_modified_at: 2024-03-20
---

# 03-13-2025

### 1. parallel

```python
Test for different OMP_NUM_THREADS and MKL_NUM_THREADS
LMAX=1024, NSIDE=512, n_runs=50
Format: OMP  MKL  total_time(s)  avg_cpu(%)
1    1    114.30  0.02
1    2    114.30  0.06
1    4    114.40  0.04
2    1    114.34  0.05
2    2    114.50  0.09
2    4    114.30  0.06
4    1    114.47  0.02
4    2    114.36  0.04
4    4    114.42  0.04
8    1    114.28  0.05
8    2    114.36  0.05
8    4    114.40  0.02

```

- probably `healpy` in my environment did not employ openMP.
- lacking C++ support?
- ==need to check/reinstall healpix, or update to the latest version==

### 2. small prior overfitting

![Pasted image 20250313123425](https://cmb-sbi-records.netlify.app/assets/images/20250313123425.png)


- adding offset
- take logarithms
- train:val = 5:5
- Using lower lr


---

### 3. compression：2507->5

![Pasted image 20250313133756](/assets/images/20250313133756.png)


Best Validation Loss: 3.356e-04
Predicted parameters:
 [[0.02252363 0.11904449 0.69578373 0.95449567 3.3303783 ]]

*The 3.33 was caused by a bug in generating the obs data for the compressor, already fixed*

- The network structure still needs to be adjusted, or the hyperparameters need to be trained, and the loss value can reasonably be reduced to 1e-6

---

### 4. Gaussian prior + its bandpower


```python
param_bounds = np.array([
    [0.019, 0.026],   # omega_b
    [0.07, 0.18],     # omega_cdm
    [0.6,  0.9],      # h
    [0.8,  1.15],     # n_s
    [2.0,  4.0]       # ln(10^10 A_s)
])

mu = param_bounds.mean(axis=1)                    
sigma = (param_bounds[:,1] - param_bounds[:,0]) / 6.0

```

- sample size: $10^5$
- model='maf', hidden_features=32, num_transforms=8
- lr 5e-5


==Results with bandpower==

![Pasted image 20250313134635](/assets/images/20250313134635.png)

![Pasted image 20250313134640](/assets/images/20250313134640.png)


#### validation coverage test

```
theta_val shape: (500, 5)
x_val shape: (500, 121)

```

![Pasted image 20250313134658](/assets/images/20250313134658.png)

![Pasted image 20250313134700](/assets/images/20250313134700.png)


![Pasted image 20250313134711](/assets/images/20250313134711.png)

![Pasted image 20250313134715](/assets/images/20250313134715.png)

![Pasted image 20250313134719](/assets/images/20250313134719.png)



---

### to-do list

1. use a more realistic noise, planck noise map
	1. likelihood paper maps with he corresponding noise maps
	2. and the actual maps, variance maps
2. start from 2 maps+noise, then increase the number
3. add other effects
4. plik marginal out all of the foregrounds 2015
5. 2015 foregrounds 

Thursday 1400
