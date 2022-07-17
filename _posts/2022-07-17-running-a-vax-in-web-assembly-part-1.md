---
layout: post
title: SIMH Web Assembly - Part 1
subtitle: Attempting to run a VAX780 emulator in a web browser
cover-img: /assets/img/vax780.png
thumbnail-img: /assets/img/vax780.png
share-img: /assets/img/vax780.png
gh-repo: OhmGeek/SIMH-WebAssembly
gh-badge: [star, fork, follow]
tags: [programming, simh, vax780, experimental]
---
The goal: run a VAX780 SimH emulator within a web browser using web assembly.

Note: This experiment was undertaken in January 2022, and as such we are using [SimH v4](https://github.com/simh/simh). Since this experiment was made, there has been a licensing change on this original repo. The steps I've followed here should also work with [Open SimH](https://github.com/open-simh/simh), but I haven't tested it. 

# Goal 1: Run the vax780 binary with nodejs
Before we try using a web browser, it's easier if we can run it within the terminal. 

## A: Installing Emscripten
While we can compile web assembly using clang directly, we're using emscripten as it provides additional support for system libraries/runtimes. Behind the scenes (as defined [here](https://emscripten.org/docs/introducing_emscripten/about_emscripten.html)) this uses Clang to compile to web assembly and also provides associated JavaScript API support to run this via a web browser/nodejs (useful for our testing).

To install, follow their [instructions](https://emscripten.org/docs/getting_started/downloads.html) to download and install. I installed the latest version, to ensure we're correctly up to date (web tech changes quickly, so keep up to date!). To summarise this, I used [emsdk](https://github.com/emscripten-core/emsdk).

Then to use the latest version, simply run:

```bash
./emsdk install latest
./emsdk activate latest
```

While we can compile C into WASM using Clang directly, Emscripten adds lots of additional support for system libraries (such as pthreads/sdl support, among others).

## B: Initial compilation failure, and modifying the makefile
Initially, I simply ran:

```
make GCC=emcc
```

In theory this should work, but ended in a compilation failure. This makes all targets, but uses emcc instead. While we can reduce the scope, I wanted to see how far we could go.

One of the build steps is ROM building: this will build a C executable, and then invoke this to build the ROM itself. As we're building a wasm binary, this fails (we can't just do ./binary to run it). For now, we can skip this by adding `DONT_USE_ROMS=1` to the make execution.


After this, another problem: tests. Tests again run the executable directly, which doesn't work in this current form.
To workaround this, add the `TESTS=0` option which works fine. We might want to improve this later by invoking the nodejs tests, but this is something we can do separately.

More errors now because of pthread. By default, pthread is required to be linked. We need to add `LDFLAGS=-pthread` as another makefile option, which link in the emscripten pthread support.

Finally, does it compile? Not quite, as everything failed with various memory errors. To workaround this, recompile everything with `CFLAGS_G=-s TOTAL_MEMORY=64MB`. This allows us to allocate a block of memory at compile time (of 64MB).

After doing this, we can compile everything correctly. Now we can try running it...

## C: nodejs execution of emscripten output. 
For now, we can try running the output binary with node directly. Does it work? Short answer is no.

While nodejs supports this, we need to add two CLI options to make it work.
```
node --experimental-wasm-threads --experimental-wasm-bulk-memory <binary>
```

The `--experimental-wasm-threads` option allows the pthread support (in web assembly, threads don't fully exist, so this does the next best thing: use web workers - at least from my understanding).

The `--experimental-wasm-bulk-memory` option is to allow us to allocate a shared array with lots of memory.

Doing this for the vax780 binary works, and we get a glimmer of hope with the following output, but there's another error:

```
[ryan@lexo BIN]$ node --experimental-wasm-threads --experimental-wasm-bulk-memory vax780

VAX 11/780 simulator V4.0-0 Current        git commit id: 0c7bf366+uncommitted-changes
Aborted(To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking)
/home/ryan/Documents/dev/simh/BIN/vax780:1
```

Very close, but no cigar!

## D: Runtime linking, and the simulator framework is (sort of) working
There are many SIMH simulators, each with their own potential libraries (some depend on SDL2, some don't). The overall framework links at runtime, rather than at compile time as part of an [early design decision](https://groups.io/g/simh/message/299?p=%2C%2C%2C20%2C0%2C0%2C0%3A%3Arecentpostdate%2Fsticky%2C%2Cdlopen%2C20%2C2%2C0%2C78612847).

Runtime linking uses `dlopen`, which requires some support in emscripten as defined here: https://emscripten.org/docs/compiling/Dynamic-Linking.html

To fix this, we can try compiling with the module set: `emcc -s MAIN_MODULE <file to compile>`. Set GCC=`emcc -s MAIN_MODULE` to try this.

This seems fairly reasonable, as it generates lots of system libraries during the build.

And voila! This runs, albeit in a loop trying to request user input. 

```
VAX 11/780 simulator V4.0-0 Current        git commit id: 0c7bf366+uncommitted-changes
sim> 
sim> 
sim> 
sim> 
...
...
sim> 

```

While this is a start, it's not particularly doing anything useful. In other parts, we will do more to make this work.


## More details/further reading:
- [Scripts documenting how to run SimH within Web Assembly](https://github.com/OhmGeek/SIMH-WebAssembly)
- [VAX780 (and the source of the post image)](https://gunkies.org/wiki/VAX-11/780)
- [OpenSimH](https://github.com/open-simh/simh)
- [SimH v4](https://github.com/simh/simh)
- [SimH v3 - the original Bob Supnik maintained fork](http://simh.trailing-edge.com/)
- [SimH Mailing List](https://groups.io/g/simh)
