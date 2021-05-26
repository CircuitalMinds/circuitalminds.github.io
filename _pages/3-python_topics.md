---
layout: page
title: Python Topics
image: topics.png
permalink: /python-topics/
---
<h3 align="center">Interesting Topics in Python</h3>

***

Soon, By: __FractalMetric.__ Threading, Parallel Processing, and GPU Acceleration with Cuda 

{% highlight python %}
from numba import jit, guvectorize, complex128, int64
import matplotlib.pyplot as plt
import numpy as np

@jit
def mandelbrot_iteration(c, maxiter):
    z = 0
    for n in range(maxiter):
        z = z**2+c
        if z.real*z.real+z.imag*z.imag > 4:
            return n
    return maxiter

@guvectorize([(complex128[:], int64[:], int64[:])], '(n), () -> (n)',
             target='parallel')
def mandelbrot(c, itermax, output):
    nitermax = itermax[0]
    for i in range(c.shape[0]):
        output[i] = mandelbrot_iteration(c[i], nitermax)

def mandelbrot_set(xmin, xmax, ymin, ymax, npts, nitermax):
    cy, cx = np.ogrid[ymin:ymax:npts*1j, xmin:xmax:npts*1j]
    c = cx+cy*1j
    return mandelbrot(c, nitermax)

def plot(data, xmin, xmax, ymin, ymax):
    plt.imshow(data, cmap='jet', interpolation='none')
    plt.show()

nitermax = 2000
npts = 1024
xmin = -2
xmax = 1
ymin = -1.5
ymax = 1.5
data = mandelbrot_set(xmin, xmax, ymin, ymax, npts, nitermax)
plot(data, xmin, xmax, ymin, ymax)
{% endhighlight %}
