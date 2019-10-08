MBB:0035 
0x00007fb0e0117e60:   90                               nop
0x00007fb0e0117e61:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0117e50
0x00007fb0e0117e69:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0036 
0x00007fb0e0117e73:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0117e76:   0f 8d 09 01 00 00                jge    0x00007fb0e0117f85
MBB:0037 
0x00007fb0e0117e7c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117e86:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0038 
0x00007fb0e0117e90:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0117e93:   0f 8d 20 00 00 00                jge    0x00007fb0e0117eb9
MBB:0039 
0x00007fb0e0117e99:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0117ea3:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0117ea7:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117eb1:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0117eb4:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0117e90
MBB:0040 
0x00007fb0e0117eb9:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0117ec3:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117ecd:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0117ed7:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0117ee1:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e0117eeb:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0117e48
0x00007fb0e0117ef3:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0117ef8:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0117efc:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0117e40
0x00007fb0e0117f04:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0117e38
0x00007fb0e0117f0c:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0117e30
0x00007fb0e0117f14:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0117e28
0x00007fb0e0117f1c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117f26:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0117f29:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0117f2c:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0117f30:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0117f33:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0117f36:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0117f39:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0117f3c:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0117f3f:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0117f42:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0117f45:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0117f4a:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0117f4e:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0117f53:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0117f57:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0117f5b:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0117f60:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0117f64:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0117f68:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0117f6d:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0117f71:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0117f75:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0117f79:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0117f7d:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0117f80:   e9 ee fe ff ff                   jmpq   0x00007fb0e0117e73
MBB:0041 
0x00007fb0e0117f85:   c3                               retq   
