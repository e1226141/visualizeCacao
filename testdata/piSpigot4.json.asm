MBB:0028 
0x00007fb0e0117ba8:   90                               nop
0x00007fb0e0117ba9:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0117b98
0x00007fb0e0117bb1:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0029 
0x00007fb0e0117bbb:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0117bbe:   0f 8d 09 01 00 00                jge    0x00007fb0e0117ccd
MBB:0030 
0x00007fb0e0117bc4:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117bce:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0031 
0x00007fb0e0117bd8:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0117bdb:   0f 8d 20 00 00 00                jge    0x00007fb0e0117c01
MBB:0032 
0x00007fb0e0117be1:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0117beb:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0117bef:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117bf9:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0117bfc:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0117bd8
MBB:0033 
0x00007fb0e0117c01:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0117c0b:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117c15:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0117c1f:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0117c29:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e0117c33:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0117b90
0x00007fb0e0117c3b:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0117c40:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0117c44:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0117b88
0x00007fb0e0117c4c:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0117b80
0x00007fb0e0117c54:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0117b78
0x00007fb0e0117c5c:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0117b70
0x00007fb0e0117c64:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117c6e:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0117c71:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0117c74:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0117c78:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0117c7b:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0117c7e:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0117c81:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0117c84:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0117c87:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0117c8a:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0117c8d:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0117c92:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0117c96:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0117c9b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0117c9f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0117ca3:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0117ca8:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0117cac:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0117cb0:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0117cb5:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0117cb9:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0117cbd:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0117cc1:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0117cc5:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0117cc8:   e9 ee fe ff ff                   jmpq   0x00007fb0e0117bbb
MBB:0034 
0x00007fb0e0117ccd:   c3                               retq   
